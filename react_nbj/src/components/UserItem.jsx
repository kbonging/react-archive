import React from 'react';

const UserItem = ({ user, onEditUser, onDeleteUser }) => {
    return (
        <div
        key={user.id}
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200"
        >
        <div className="p-3">
            <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-base">
                {user.name.charAt(0)}
                </span>
            </div>
            <div className="ml-2.5">
                <h3 className="text-base font-semibold text-gray-800 truncate max-w-[180px]">{user.name}</h3>
                <p className="text-sm text-gray-600 truncate max-w-[180px]">@{user.username}</p>
            </div>
            </div>
            
            <div className="space-y-1.5">
            <p className="text-sm text-gray-600 flex items-center">
                <svg className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{user.email}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center">
                <svg className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="truncate">{user.address.city}</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center">
                <svg className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{user.company.name}</span>
            </p>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
            <button onClick={()=>onEditUser(user)} className="text-blue-600 hover:text-blue-700 transition duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <button onClick={()=>onDeleteUser(user.id)} className="text-red-600 hover:text-red-700 transition duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            </div>
        </div>
        </div>
    );
}

export default UserItem;