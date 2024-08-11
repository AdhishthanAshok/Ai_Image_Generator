"use client";

import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "../../utils/firestore";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null); // Use `any` for simplicity; replace with User type if needed
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setProfileImage(currentUser.photoURL);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setProfileImage(file);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen dark:bg-gray-900 transition-colors duration-300">
      <header className="bg-muted py-6 px-4 sm:px-6 md:py-8 md:px-8">
        <div className="container mx-auto flex flex-row items-center justify-between">
          <div className="flex flex-col items-center gap-4 mb-4 md:mb-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
              <img
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {user && (
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold sm:text-2xl text-gray-900 dark:text-gray-50">
                  {user.displayName}
                </h1>
              </div>
            )}
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-2">
            {user ? (
              <>
                <Button
                  onClick={handleLogout}
                  className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Logout
                </Button>
                <Button
                  onClick={() => document.getElementById("fileInput")?.click()}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Change Photo
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="fileInput"
                />
              </>
            ) : (
              <Button
                onClick={handleLogin}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Login with Google
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4 sm:px-6 md:py-12 md:px-8">
        {user && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Your Images
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {/* Replace with your photo links */}
                {[...Array(8)].map((_, index) => (
                  <a href="#" className="relative group" key={index}>
                    <img
                      src="/placeholder.svg"
                      alt="Photo"
                      className="aspect-square w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
