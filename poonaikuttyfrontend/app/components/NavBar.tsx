import Link from "next/link"

export default function NavBar(){
    return (
        <nav>
            <Link href = {"/"}>Journal</Link>
            <Link href = {"/journal"}>Journal</Link>

        </nav>
    )
}