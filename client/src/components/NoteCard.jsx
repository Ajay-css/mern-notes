import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils.js'
import api from '../lib/axio.js'
import { toast } from 'react-hot-toast'

const NoteCard = ({ note, setNotes }) => {

    const handleDelete = async (e, id) => {
        e.preventDefault()
        if (!window.confirm('Are you sure you want to delete this note?')) return;
        try {
            await api.delete(`/notes/${id}`)
            toast.success('Note deleted successfully!')
            setNotes(prev => prev.filter(note => note._id !== id))
        } catch (error) {
            toast.error('Failed to delete note. Please try again.')
            console.error('Error deleting note:', error)
        }
    }

    return <Link to={`/note/${note._id}`}
        className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00ff9d]'
    >
        <div className='card-body'>
            <h2 className='card-title'>{note.title}</h2>
            <p className='text-gray-500'>{note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content}</p>
            <div className='card-actions justify-between'>
                <span className='text-sm text-base-content/60'>
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4' />
                    <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2Icon className='size-4' />
                    </button>
                </div>
            </div>
        </div>
    </Link>
}

export default NoteCard