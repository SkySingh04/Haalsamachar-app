import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

interface DeleteDialogueBoxProps {
    blogId?: string;
    commentId?: string;
    userId: string;
    isComment?: boolean;
    isBlog?: boolean;
    onClose: () => void; // Add onClose prop for handling close event
}

const blogsAPI = process.env.NEXT_PUBLIC_BLOGS_API_URL;
const commentsAPI = process.env.NEXT_PUBLIC_COMMENTS_API_URL;

const DeleteDialogueBox: React.FC<DeleteDialogueBoxProps> = ({
    blogId,
    commentId,
    userId,
    isComment,
    isBlog,
    onClose, // Receive onClose prop
}) => {
    const [canDelete, setCanDelete] = useState(false);
    const router = useRouter();

    const handleDelete = () => {
        console.log("Delete authorized");
        if (isBlog) {
            fetch(`${blogsAPI}/blogs/${blogId}`, {
                method: "DELETE",
            })
                .then(() => {
                    onClose(); // Call onClose function to close the dialogue box
                    toast.success("Blog deleted successfully");
                    router.push("/");
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Failed to delete blog");
                    onClose();
                });
        } else if (isComment) {
            fetch(`${commentsAPI}/comments/${commentId}`, {
                method: "DELETE",
            })
                .then(() => {
                    onClose(); // Call onClose function to close the dialogue box
                    toast.success("Comment deleted successfully");
                    router.refresh()
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Failed to delete comment");
                    onClose();
                });
        }
    };

    useEffect(() => {
        const checkIfUserCanDelete = async () => {
            if (userId === "468690") {
                setCanDelete(true);
                console.log("Admin user")
                return;
            }
            if (isBlog) {
                try {
                    const response = await fetch(`${blogsAPI}/blogs/${blogId}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch blog");
                    }
                    const data = await response.json();
                    if (data.user_id == userId) {
                        setCanDelete(true);
                        console.log("User is author of blog")
                        return;
                    }
                } catch (error) {
                    console.error(error);
                }
            } else if (isComment) {
                // Check if the user is the author of the comment
                try {
                    const response = await fetch(`${commentsAPI}/blogs/${blogId}/comments`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch comments");
                    }
                    const data = await response.json();
                    //filter out the comment with the commentId
                    const comment = data.filter((comment: any) => comment.id === commentId);
                    if (comment[0].user_id == userId) {
                        setCanDelete(true);
                        console.log("User is author of comment")
                        return;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        checkIfUserCanDelete();
    }, [blogId, commentId, userId, isComment, isBlog]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  ">
            <ToastContainer />
            <div className="bg-bt-navy p-6 rounded-lg w-[500px]">
                <div className="flex justify-end">
                    <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Confirm Delete</h3>
                {canDelete ? (
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex justify-center w-full"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                ) : (
                    <p className="text-center text-red-500">You are not authorized to delete this item.</p>
                )}
            </div>
        </div>
    );
};

export default DeleteDialogueBox;
