'use client'
import { Plus, Search, Layout, Users, Trash2 } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '../../components/Skeleton';
import { Container } from '../../components/container';
import { Input } from "../../components/ui/input";
import { cn } from '../../lib/utils';
import CreateSpace from '../../components/CreateSpace';
import { Space } from '../../../types';


export default function MySpaces() {
    const router = useRouter();
    const [mockSpaces, setMockSpaces] = useState<Space[]>([])
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);
    const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    useEffect(() => {
        const fetchSpaces = async () => {
            try {
                const response = await axios.get(`${backendUrl}api/v1/space/all`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setMockSpaces(response.data.spaces);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.status == 401 || error.status == 403) {
                        localStorage.removeItem('token')
                        router.push('/signin')
                    }
                }
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        }

        fetchSpaces()
    }, [])

    const handleOpenModal = (id: string) => {
        setSelectedSpaceId(id);
        setIsModalOpen(true);
    };

    const deleteSpace = async () => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/space/${selectedSpaceId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                setMockSpaces(prevSpaces =>
                    prevSpaces.filter(space => space.id !== selectedSpaceId)
                );
            }
        } catch (error) {
            console.error("Failed to delete the space:", error);
        }
    }

    const filteredSpaces = mockSpaces.filter(space =>
        space.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <div className="max-w-7xl relative mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">My Spaces</h1>
                        <p className="mt-1 text-sm text-neutral-400">Manage and monitor your virtual spaces</p>
                    </div>
                    <button  onClick={() => setIsCreateSpaceModalOpen(true)} className="relative cursor-pointer bg-neutral-900 shadow-input rounded-xl border border-neutral-700 px-4 py-2 text-white hover:bg-neutral-700 transition-colors duration-400">
                    <div className='absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-sky-600 to-transparent'></div>
                    <div className='flex items-center gap-1'>
                    <Plus className="h-5 w-5" />Create Space
                    </div>
                    </button>
                </div>
                <div className="relative mb-8">
                    <LabelInputContainer className="mb-4">
                        <Input id="search" placeholder="🔍 Search spaces..." type="text" onChange={(e) => setSearchTerm(e.target.value)} />
                    </LabelInputContainer>
                </div>
                {loading ? <SpaceListSkeleton /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSpaces.map(space => (
                        <div key={space.id} className="bg-foreground-300/30 rounded-lg shadow-xs hover:shadow-2xl transition-shadow p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary-700/30 rounded-lg">
                                        <Layout strokeWidth={3} className="h-5 w-5 text-primary-600" />
                                    </div>
                                    <h3 className="font-semibold text-lg">{space.name}</h3>
                                </div>
                                <div onClick={() => handleOpenModal(space.id)} className="p-2 hover:bg-destructive/20 transition-color cursor-pointer rounded-md">
                                    <Trash2 strokeWidth={3} className="h-4 w-4 text-destructive" />
                                </div>
                            </div>
                            <div className="space-y-3 font-bold">
                                <div className="flex justify-between text-sm opacity-70">
                                    <span className="">Dimensions:</span>
                                    <span className="font-light">{space.dimensions}</span>
                                </div>
                                <div className="flex justify-between text-sm opacity-70">
                                    <span className="">Space ID:</span>
                                    <span className="font-light">{space.id}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t">
                                    <div className="flex items-center gap-2">
                                        <Users strokeWidth={3} className="h-4 w-4 text-primary-500" />
                                        <span className="text-sm">Users:</span>
                                    </div>
                                    <Link
                                        href={`/space/${space.id}`}>
                                        <button className="bg-foreground-300 transition-transform cursor-pointer px-2 py-1 rounded-md hover:-translate-y-0.5">
                                            Join
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
            <CreateSpace isOpen={isCreateSpaceModalOpen} onClose={() => setIsCreateSpaceModalOpen(false)} setMockSpaces={setMockSpaces} />
        </Container>
    );
}



function SpaceListSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-foreground-300/30 rounded-lg shadow-xs transition-shadow p-6">
                    <div className="flex justify-between items-start mb-6">
                        <Skeleton className="h-7 w-2/5" />
                        <Skeleton className="h-6 w-9" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <Skeleton className="h-4 w-2/4 mb-2" />
                            <Skeleton className="h-4 w-1/4 mb-2" />
                        </div>
                        <div className="flex justify-between text-sm">
                            <Skeleton className="h-4 w-1/4 mb-2" />
                            <Skeleton className="h-4 w-3/5 mb-2" />
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t">
                            <Skeleton className="h-7 w-2/6" />
                            <Skeleton className="h-7 w-1/5" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export const LabelInputContainer = ({
    children,
    className,
    }: {
    children: React.ReactNode;
    className?: string;
    }) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
        {children}
        </div>
    );
    };
