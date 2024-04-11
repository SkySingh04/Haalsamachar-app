
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
export default function LoginPage() {
  return (
    <main className="">
      <Header bgImage="/login.jpg" 
        heading="Login"
        subheading="Please log in to continue."
      />
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ">
        <LoginForm />
      </div>
    </main>
  );
}
