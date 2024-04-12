'use server';   
import React from 'react'
import SimpleMDE from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css";

const ContentComponent = () => {
  return (
    <div>
            <label htmlFor="content" className="block font-semibold">
              Content:
            </label>
            <SimpleMDE
              id="content"
              className="w-full border border-bt-teal bg-bt-peach text-bt-navy rounded-md px-4 py-2"
            />
          </div>
  )
}

export default ContentComponent
