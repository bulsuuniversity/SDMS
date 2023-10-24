import { useSession } from 'next-auth/react';
import Header from './Header';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { ImNotification } from 'react-icons/im';
import { url } from '@/app/libs/api';

function PublicRoute({ children }) {
    const { data: session } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (session && session.role === 'admin') {
            router.push("/Admin")
        }
    }, [])

    return (
        <>
            <Header />
            {children}
        </>)
}

function PrivateRoute({ children }) {
    const router = useRouter()
    const handleLogout = (e) => {
        e.preventDefault();
        signOut({ callbackUrl: url })
    };
    const { data: session } = useSession();

    if (!session) {
        return (
            <>
                <Header />
                <div className='grid justify-center items-center gap-4 my-20'>
                    <h2 className='text-center font-bold text-2xl font-red-600'>Unauthorized</h2>
                    <div className='flex justify-center'>
                        <ImNotification size={100} className='bg-red-600 text-white rounded-full' />
                    </div>
                    <div className='text-center'>Please Login to access this page!</div>
                    <Link className='italic text-center' href={"/Login"}>Click to Login.</Link>
                </div>
            </>
        )
    } else if (session && session.status !== 'Registered') {
        return (
            <>
                <Header />
                <div className='grid justify-center items-center gap-4 my-20'>
                    <h2 className='text-center font-bold text-2xl font-red-600'>Unauthorized</h2>
                    <p className='text-centerfont-bold text-lg'>Please wait for the Admin to approve your account</p>
                    <div className='flex justify-center'>
                        <ImNotification size={100} className='bg-red-600 text-white rounded-full' />
                    </div>
                    <a className='text-blue-400 text-center italic' href="mailto:bulsubulacanUniversity@gmail.com?subject=Request%20for%20Approval&body=This%20is%20..your%20name%20...%20">Click to email the Admin using emailing app.</a>
                    <a className='text-blue-400 text-center italic' href="https://mail.google.com/mail/?view=cm&fs=1&to=bulsubulacanUniversity@gmail.com&su=Request%20for%20account%20approval&body=Hello%20SDMS%20admin,%0D%0A%0D%0APlease%20approve%20my%20account.%20My%20name%20is%20______%20and%20School%20ID%20Number%20is%20______" target="_blank">Click to email Admin using browser.</a>
                    <div className="flex justify-center">
                        <button className='bg-red-800 text-white w-28 px-4 py-2' onClick={handleLogout}>Log out</button>
                    </div>
                </div>
            </>
        )
    }
    else if (session && session.role === 'admin') {
        useEffect(() => {
            router.push("/Admin")
        }, [])
    }
    return <>{children}</>;
}


function PrivateRouteAdmin({ children }) {
    const { data: session } = useSession();
    const router = useRouter()
    const handleLogout = (e) => {
        e.preventDefault();
        signOut({ callbackUrl: `${url}/Admin/AdminLogin` })
    };
    if (!session) {
        return (
            <>
                <Header />
                <div className='grid justify-center items-center gap-4 my-20'>
                    <h2 className='text-center font-bold text-2xl font-red-600'>Unauthorized</h2>
                    <div className='flex justify-center'>
                        <ImNotification size={100} className='bg-red-600 text-white rounded-full' />
                    </div>
                    <div className='text-center'>Please Login to access this page!</div>
                    <Link className='italic text-center' href={"/Admin/AdminLogin"}>Click to Login Admin Account.</Link>
                </div>
            </>
        )
    } else if (session && session.role !== "admin") {
        return (
            <>
                <Header />
                <div className='grid justify-center items-center gap-4 my-20'>
                    <h2 className='text-center font-bold text-2xl font-red-600'>Unauthorized</h2>
                    <p className='text-centerfont-bold text-lg'>You are not an admin</p>
                    <div className='flex justify-center'>
                        <ImNotification size={100} className='bg-red-600 text-white rounded-full' />
                    </div>
                    <a className='text-blue-400 text-center italic' href="mailto:bulsubulacanUniversity@gmail.com?subject=Request%20for%20Approval&body=This%20is%20..your%20name%20...%20">Click to email the Admin using emailing app.</a>
                    <a className='text-blue-400 text-center italic' href="https://mail.google.com/mail/?view=cm&fs=1&to=bulsubulacanUniversity@gmail.com&su=Request%20for%20account%20approval&body=Hello%20SDMS%20admin,%0D%0A%0D%0APlease%20approve%20my%20account.%20My%20name%20is%20______%20and%20your%20message%20to%20Admin%20______" target="_blank">Click to email admin using browser.</a>
                    <div className="flex justify-center">
                        <button className='bg-red-800 text-white w-28 px-4 py-2' onClick={handleLogout}>Log out</button>
                    </div>
                </div>
            </>
        )
    } else if (session && session.role === "admin" && session.status !== "Registered") {
        return (
            <>
                <Header />
                <div className='grid justify-center items-center gap-4 my-20'>
                    <h2 className='text-center font-bold text-2xl font-red-600'>Unauthorized</h2>
                    <p className='text-centerfont-bold text-lg'>Please wait for the Admin to approve your account.</p>
                    <div className='flex justify-center'>
                        <ImNotification size={100} className='bg-red-600 text-white rounded-full' />
                    </div>
                    <a className='text-blue-400 text-center italic' href="mailto:bulsubulacanUniversity@gmail.com?subject=Request%20for%20Approval&body=This%20is%20..your%20name%20...%20">Click to email the Admin using emailing app.</a>
                    <a className='text-blue-400 text-center italic' href="https://mail.google.com/mail/?view=cm&fs=1&to=bulsubulacanUniversity@gmail.com&su=Request%20for%20account%20approval&body=Hello%20SDMS%20admin,%0D%0A%0D%0APlease%20approve%20my%20account.%20My%20name%20is%20______%20and%20your%20message%20to%20admin%20______" target="_blank">Click to email admin using browser.</a>
                    <div className="flex justify-center">
                        <button className='bg-red-800 text-white w-28 px-4 py-2' onClick={handleLogout}>Log out</button>
                    </div>
                </div>
            </>
        )
    }
    return <>{children}</>;
}

export { PublicRoute, PrivateRoute, PrivateRouteAdmin };
