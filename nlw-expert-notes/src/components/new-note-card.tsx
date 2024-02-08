import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { toast } from 'sonner'

import { ChangeEvent, FormEvent, useState } from 'react'

interface newNoteCardProps {
    onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: newNoteCardProps) {

    const [ shouldShowOnBoarding, setShouldShowOnBoarding ] = useState(true)
    const [ isRecording, setIsRecording ] = useState(false)
    const [ content, setContent ] = useState('')

    function handleStartEditor () {
        setShouldShowOnBoarding(false)
    }

    function handleContentChanged (event: ChangeEvent<HTMLTextAreaElement>) {
        setContent(event.target.value)
        

        if(event.target.value === '') {
            setShouldShowOnBoarding(true)
        }
    }

    function handleSaveNote (event: FormEvent) {
        event.preventDefault()

        if (content === '') {
            return
        }

        onNoteCreated(content)
        setContent('')
        setShouldShowOnBoarding(true)
        toast.success("Nota criada com sucesso")
    }

    function handleStartRecording () {
    

        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
            || 'webkitSpeechRecognition' in window 

        if (!isSpeechRecognitionAPIAvailable) {
            alert("Infelizmente seu navegador não suporta a API de gravação")
            return
        }

        setIsRecording(true)
        setShouldShowOnBoarding(false)

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

        speechRecognition = new SpeechRecognitionAPI()

        speechRecognition.lang = 'pt-BR'
        speechRecognition.continuous = true
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true

        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript)
            }, '')

            setContent(transcription)
        }

        speechRecognition.onerror = (event) => {
            console.error(event)
        }

        speechRecognition.start() 
    }

    function handleStopRecording () {
        setIsRecording(false)
        if( speechRecognition !== null) {
            speechRecognition.stop()
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md bg-slate-700 p-5 text-left gap-3 flex flex-col hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
                <span className='text-sm font-medium text-slate-200'>
                    Adicionar nota
                </span>
                <p className='text-sm leading-6 text-slate-400'>
                     Grave uma nota em áudio que será convertida para texto automaticamente.
                </p>
            </Dialog.Trigger>

            <Dialog.DialogPortal>
                <Dialog.Overlay className='inset-0 fixed bg-black/60'>
                    <Dialog.Content className='fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
                        <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100' >
                            <X className='size-5' />
                        </Dialog.Close>

                        <form 
                            className="flex-1 flex flex-col"
                        >
                            <div className="flex flex-1 flex-col gap-3 p-5">
                                <span className='text-sm font-medium text-slate-200'>
                                    Adicionar Nota
                                </span>
                                
                                { shouldShowOnBoarding ? (
                                    <p className='text-sm leading-6 text-slate-400'>
                                    Comece <button 
                                        type='button'
                                        className='text-lime-400 font-medium hover:underline' 
                                        onClick={handleStartRecording}>
                                         gravando uma nota
                                    </button> em áudio ou se preferir <button 
                                        type='button'
                                        onClick={handleStartEditor} 
                                        className='text-lime-400 font-medium hover:underline'>
                                         utilize apenas texto
                                    </button>.
                                    </p>
                                ) : (
                                    <textarea 
                                        autoFocus 
                                        className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none' 
                                        onChange={handleContentChanged} 
                                        value={content} 
                                    />
                                )}

                            </div>

                            { isRecording ? (
                                <button 
                                    type='button' 
                                    className='w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:bg-slate-100 flex items-center justify-center gap-2'
                                    onClick={handleStopRecording}
                                >
                                <div className="size-3 rounded-full bg-red-500 animate-pulse"/>
                                Gravando! (Clique p/ interromper)
                                </button>
                            ) : (
                                <button 
                                    type='button' 
                                    className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'
                                    onClick={handleSaveNote}
                                >
                                Salvar nota
                                </button>
                            )}

                            
                        </form>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.DialogPortal>
        </Dialog.Root>

        
    )
}