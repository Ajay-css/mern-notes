import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../lib/axio.js'
import NoteNotFound from '../components/NoteNotFound.jsx'

const Home = () => {

    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get('/notes');
                console.log(res.data)
                setNotes(res.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching notes:", error);
                toast.error("Failed to fetch notes")
            }
        }
        fetchNotes()
    }, [])

    return <div className='min-h-screen'>
        <Navbar />

        <div className='max-w-7xl mx-auto p-4 mt-6'>
            {loading && <div className='text-center text-primary'>Loading Notes...</div>}

            {notes.length === 0 && <NoteNotFound />}

            {notes.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {notes.map(note => (
                        <div>
                            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                        </div>
                    ))}
                </div>
            )}
        </div>

    </div>

}

export default Home