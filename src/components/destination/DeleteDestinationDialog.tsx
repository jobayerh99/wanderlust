'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteDestinationDialog = ({id} : {id:string}) => {
    const router = useRouter();

    const handleDeleteDestination = async () => {
        const res = await fetch(`http://localhost:8000/destination/${id}`, {
            method: 'DELETE',
        })
        await res.json()
        router.push('/destinations');
            router.refresh();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline"
            className={"border-destructive/30 bg-background text-destructive hover:bg-destructive/50"}
            />}>
                <Trash2/>
                Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDestinationDialog;