import React from 'react';

const ProfilePage = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold text-accent mb-4">User Profile</h1>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 w-full max-w-lg">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl font-bold">
                        U
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">User Name</h2>
                        <p className="text-gray-500">user@example.com</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Account Status</p>
                        <p className="font-semibold">Premium Member</p>
                    </div>
                    <button className="w-full py-3 border border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
