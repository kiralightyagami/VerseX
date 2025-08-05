import { useState } from 'react';
import { Plus, ArrowRight, Loader, Link as LinkIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';
import { Space } from '../../types';
import { SelectMap } from './SelectMap';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { LabelInputContainer } from '../(spaces)/spaces/page';
import { BottomGradient } from '../(auth)/signup/page';

interface FormData {
    [key: string]: string
}

interface CreateSpaceModalProps {
    isOpen: boolean;
    onClose: () => void;
    setMockSpaces: React.Dispatch<React.SetStateAction<Space[]>>
}

const formFields = [
    {
        label: 'Space Name',
        name: 'name',
        placeholder: 'Enter space name',
        type: 'text',
        validation: {
            required: 'Name is required',
        },
        required: true
    },
    {
        label: 'Dimensions',
        name: 'dimensions',
        placeholder: 'e.g., 20x30',
        type: 'text',
        required: false
    },
    {
        label: 'Map ID',
        name: 'map1',
        placeholder: 'Enter map ID',
        type: 'text',
        required: false
    }
];

const CreateSpace = ({ isOpen, onClose, setMockSpaces }: CreateSpaceModalProps) => {
    const [mapId, setMapId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register, reset, formState: { errors } } = useForm<FormData>();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = e.target;
        if (mapId === null) return alert("Please select the Map.")
        setIsLoading(true);
        try {
            const response = await axios.post(`${backendUrl}api/v1/space/create`, {
                name: data.name.value,
                dimensions: '960x640',
                //Todo: get the mapId from the database
                mapId: 'cmdyke2q20001c71s35xdlcf0'
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                setMockSpaces(data => [...data, { id: response.data.space.id, name: response.data.space.name, dimensions: `${response.data.space.width}x${response.data.space.height}`, thumbnail: response.data.space.thumbnail }])
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            onClose()
            setIsLoading(false);
            setMapId(null)
            reset()
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex py-3 justify-center z-50">
            <div className="fixed inset-0 backdrop-blur-xs bg-background-700/70" onClick={() => { if (!isLoading) onClose() }}></div>
            <div className="w-full max-w-2xl overflow-auto [scrollbar-width:none] z-50">
                <div className="relative bg-neutral-800 rounded-2xl shadow-xl p-8 z-50">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <h1 className="text-2xl font-medium text-center tracking-tighter text-white ">Create New Space</h1>
                    </div>
                    <SelectMap mapId={mapId} setMapId={setMapId} />
                        <form autoComplete='off' onSubmit={handleSubmit} className="space-y-6 text-foreground-100">
                        {formFields.map((field) => (
                            field.required ? (<div key={field.name}>
                                <div className="relative bg-foreground-300/50 rounded-lg p-0.5">
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor={field.name}>{field.label}</Label>
                                    <Input {...register(field.name, field.validation)} id={field.name} placeholder={field.placeholder} type={field.type} />
                                </LabelInputContainer>
                                </div>
                                {errors[field.name] && (
                                    <div className="text-sm text-red-500 mt-1 ml-2">
                                        {String(errors[field.name]?.message)}
                                    </div>
                                )}
                            </div>) : null
                        ))}
        <button
        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
        type="submit"
        >
        Create Space &rarr;
        <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <div className="text-center text-sm text-neutral-300">
        Launch an existing space?
            <Link href="/spaces" className=" text-sky-600 hover:text-neutral-800 dark:hover:text-neutral-200">  Launch Space</Link>
        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default CreateSpace;