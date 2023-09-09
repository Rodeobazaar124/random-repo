"use client"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ServiceTable } from "./service-table"
import { useEffect, useState } from "react"
import { Api, cn } from "@/lib/utils"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


type Service = {
    id: string
    title: string
    logo: string
    link: string
}
const columns: ColumnDef<Service>[] = [
    {
        accessorKey: "id",
        header: "Database ID",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "logo",
        header: "Logo",
        cell: ({ row }) => {
            return <div><Image width={64} height={64} src={row.getValue('logo')} alt={row.getValue('title')} className={cn(("bg-slate-700 rounded-[6px]"))} /></div>
        },
    },
    {
        accessorKey: "link",
        header: "Linked to",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (

                <Dialog>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                    <Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                                <DropdownMenuLabel>
                                    <DialogTrigger>Open</DialogTrigger>

                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                >
                                    <DialogTrigger className={cn("w-full text-left")}>
                                        Update
                                    </DialogTrigger>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => alert('okay')} className={cn('bg-red-800 text-white rounded-md hover:bg-red-900')}
                                >
                                    Delete
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Cancel</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogContent>
                            <DialogHeader >
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="name" className="text-right">
                                        Name
                                    </label>
                                    <input id="name" value="Pedro Duarte" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="username" className="text-right">
                                        Username
                                    </label>
                                    <input id="username" value="@peduarte" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </Dialog>

            )
        },
    },
]


const HeroDashboard = () => {
    const [IsLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState();
    const [service, setService] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await Api('/service');
                if (!(response.status == 200)) {
                    return new Error('Failed fetching data')
                }
                setService(response.data.data)
            } catch (e: any) {
                setFetchError(e)
                alert(e)
            } finally {
                setIsLoading(false)
            }

        }
        fetch()
    }, [service])


    return (
        <main>
            {IsLoading && <p>Fetching data...</p>}
            {service.length ?
                <ServiceTable columns={columns} data={service} />
                :
                <p>
                    {fetchError}
                </p>
            }
        </main>
    )

}

export default HeroDashboard