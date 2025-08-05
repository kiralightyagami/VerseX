"use client";
import { Plus, Search, Layout, Users, Trash2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../../components/Skeleton";
import { Container } from "../../components/container";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";
import CreateSpace from "../../components/CreateSpace";
import { Space } from "../../../types";

export default function MySpaces() {
  const router = useRouter();
  const [mockSpaces, setMockSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}api/v1/space/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMockSpaces(response.data.spaces);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status == 401 || error.status == 403) {
            localStorage.removeItem("token");
            router.push("/signin");
          }
        }
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  const handleOpenModal = (id: string) => {
    setSelectedSpaceId(id);
    setIsModalOpen(true);
  };

  const deleteSpace = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/space/${selectedSpaceId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.status === 200) {
        setMockSpaces((prevSpaces) =>
          prevSpaces.filter((space) => space.id !== selectedSpaceId),
        );
      }
    } catch (error) {
      console.error("Failed to delete the space:", error);
    }
  };

  const filteredSpaces = mockSpaces.filter((space) =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Container>
      <div className="relative mx-auto max-w-7xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">My Spaces</h1>
            <p className="mt-1 text-sm text-neutral-400">
              Manage and monitor your virtual spaces
            </p>
          </div>
          <button
            onClick={() => setIsCreateSpaceModalOpen(true)}
            className="shadow-input relative cursor-pointer rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-white transition-colors duration-400 hover:bg-neutral-700"
          >
            <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-sky-600 to-transparent"></div>
            <div className="flex items-center gap-1">
              <Plus className="h-5 w-5" />
              Create Space
            </div>
          </button>
        </div>
        <div className="relative mb-8">
          <LabelInputContainer className="mb-4">
            <Input
              id="search"
              placeholder="🔍 Search spaces..."
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </LabelInputContainer>
        </div>
        {loading ? (
          <SpaceListSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSpaces.map((space) => (
              <div
                key={space.id}
                className="rounded-lg border border-neutral-700 bg-neutral-800 p-6 shadow-xs transition-shadow hover:shadow-2xl"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-500/30 p-2">
                      <Layout
                        strokeWidth={3}
                        className="h-5 w-5 text-blue-600"
                      />
                    </div>
                    <h3 className="text-lg font-medium">{space.name}</h3>
                  </div>
                  <div
                    onClick={() => handleOpenModal(space.id)}
                    className="hover:bg-destructive/20 transition-color cursor-pointer rounded-md p-2"
                  >
                    <Trash2
                      strokeWidth={3}
                      className="text-destructive h-4 w-4 text-red-500 hover:text-red-600"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-white">Dimensions:</span>
                    <span className="font-light text-neutral-400">
                      {space.dimensions}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-white">Space ID:</span>
                    <span className="font-light text-neutral-400">
                      {space.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Users strokeWidth={3} className="h-4 w-4 text-white" />
                      <span className="text-sm font-medium text-white">
                        Users:
                      </span>
                    </div>
                    <Link href={`/space/${space.id}`}>
                      <button className="shadow-input relative cursor-pointer rounded-xl border border-neutral-700 bg-sky-600 px-4 py-2 text-white transition-colors duration-400 hover:bg-neutral-700 hover:text-sky-400">
                        <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-sky-600 to-transparent transition-all duration-300"></div>
                        Join
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <CreateSpace
        isOpen={isCreateSpaceModalOpen}
        onClose={() => setIsCreateSpaceModalOpen(false)}
        setMockSpaces={setMockSpaces}
      />
    </Container>
  );
}

function SpaceListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-background-900/50 rounded-lg p-6 shadow-xs transition-shadow"
        >
          <div className="mb-6 flex items-start justify-between">
            <Skeleton className="h-7 w-2/5" />
            <Skeleton className="h-6 w-9" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <Skeleton className="mb-2 h-4 w-2/4" />
              <Skeleton className="mb-2 h-4 w-1/4" />
            </div>
            <div className="flex justify-between text-sm">
              <Skeleton className="mb-2 h-4 w-1/4" />
              <Skeleton className="mb-2 h-4 w-3/5" />
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <Skeleton className="h-7 w-2/6" />
              <Skeleton className="h-7 w-1/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
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
