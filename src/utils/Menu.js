import React, { useState, useRef, useEffect } from 'react';
import { BsPersonCircle, BsExclamationCircle } from 'react-icons/bs';
import { RiNavigationFill } from 'react-icons/ri';
import { BiCommentError } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';
import { ImNewspaper } from 'react-icons/im';
import { FaUserCircle } from 'react-icons/fa';
import { VscSignOut } from 'react-icons/vsc';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useProfileData } from '@/app/libs/store';
import useConfirmation from './ConfirmationHook';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { url } from '@/app/libs/api';
import { FcDataProtection } from 'react-icons/fc';

const Menu = ({ profile }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const profileRef = useRef(null);
    const { profileData } = useProfileData()
    const { showConfirmation, ConfirmationDialog } = useConfirmation();
    const router = useRouter()

    const handleToggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const handleClickOutside = event => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    async function handleSignOutna() {
        try {
            await signOut({ callbackUrl: url })

        } catch (error) {
            console.error('Sign out failed', error);
        }
    }

    const handleSignOut = (e) => {
        e.preventDefault();
        showConfirmation(<div className='grid justify-center gap-4'>
        <div className='bg-red-700 flex items-center text-white rounded-t-lg gap-4 w-full'><FcDataProtection size={32}/>Logout Account</div>
         <p className='text-xl text-black p-6'>Are you sure you want to logout this account?</p>
         </div>, () => {
            handleSignOutna()
        });
    };

    return (
        <div className={`flex items-center`} ref={profileRef}>
            <span onClick={handleToggleMenu} className="mr-7">
                <div className='hidden md:block'>
                    {profile ? <div className="w-14 h-14 rounded-full overflow-hidden ">
                        <Image alt="profile"
                            src={profile}
                            width={100}
                            height={100}
                            className="object-fill" />
                    </div>
                        : <BsPersonCircle size={40} className='text-white' />}
                </div>
                {profileData && profileData.name ? '' :
                    <div className='fixed top-1 right-2 bg-amber-400 text-white rounded-full'>
                        <BsExclamationCircle size={20} /></div>
                }
                <div className='md:hidden block'>Profile</div>
            </span>
            {menuOpen && (
                <div className="fixed top-8 right-2 flex flex-col">
                    <div className='relative right-52 top-0'>
                        <div className="absolute top-0 -right-52 scale-y-[-1] text-blue-600">
                            <RiNavigationFill size={38} className='rotate-45' />
                        </div>
                        <ConfirmationDialog />
                        <div className="absolute top-8 w-max">
                            <div className="flex text-red-900 shadow shadow-gray-500 text-sm w-full flex-col">
                                <div className={`${profileData && profileData.name ? 'bg-white' : 'bg-gray-400'} flex flex-col`}>
                                    <Link
                                        href={profileData && !profileData.name ? '' : '/MakeReport'}
                                        // onClick={handleToggleMenu}
                                        className={`${profileData && profileData.name ? '' : 'cursor-not-allowed'} flex gap-4 border border-transparent p-4 hover:bg-gray-300 hover:border-gray-800 items-center`}>
                                        <BiCommentError size={32} /> MAKE A REPORT</Link>
                                    {/* <Link
                                        href={profileData && !profileData.name ? '' : '/Consult'}
                                        // onClick={handleToggleMenu}
                                        className={`${profileData && profileData.name ? '' : 'cursor-not-allowed'} flex gap-4 border border-transparent p-4 hover:bg-gray-300 hover:border-gray-800 items-center`}>
                                        <FaUserFriends size={32} /> CONSULTATION</Link> */}
                                    <Link
                                        href={profileData && !profileData.name ? '' : '/Logs'}
                                        // onClick={handleToggleMenu}
                                        className={`${profileData && profileData.name ? '' : 'cursor-not-allowed'} flex gap-4 border border-transparent p-4 hover:bg-gray-300 hover:border-gray-800 items-center`}>
                                        <ImNewspaper size={32} /> REPORT LOGS</Link>
                                </div>
                                <div className="bg-white flex flex-col">
                                    <Link
                                        href={'/Profile'}
                                        // onClick={handleToggleMenu}
                                        className='flex gap-4 border border-transparent p-4 hover:bg-gray-300 hover:border-gray-800 items-center'>
                                        <FaUserCircle size={32} /> PROFILE
                                        {profileData && !profileData.name && <div className="text-white bg-yellow-600 rounded-full"><BsExclamationCircle size={24} /></div>}
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className='flex gap-4 border border-transparent p-4 hover:bg-gray-300 hover:border-gray-800 items-center'>
                                        <VscSignOut size={32} /> SIGN OUT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
