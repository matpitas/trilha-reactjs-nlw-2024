import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

export function NewNoteCard() {
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
                    <Dialog.Content className='fixed overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none'>
                        <Dialog.Close className='absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100' >
                            <X className='size-5' />
                        </Dialog.Close>
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span className='text-sm font-medium text-slate-200'>
                                Adicionar Nota
                            </span>
                            <p className='text-sm leading-6 text-slate-400'>
                                Comece <button className='text-lime-400 font-medium hover:underline'>gravando uma nota</button> em áudio ou se preferir <button className='text-lime-400 font-medium hover:underline'>utilize apenas texto</button>.
                            </p>
                        </div>

                        <button type='button' className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'>
                            Salvar nota
                        </button>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.DialogPortal>
        </Dialog.Root>

        
    )
}