// app/profile/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileForm, ProfileData } from "@/components/ProfileForm";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Local state for form updates
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch profile data from our internal API route
  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch profile data");
      }
      const data = await response.json();
      setProfileData(data);
      setFirstName(data.first_name);
      setLastName(data.last_name);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [session, status]);

  // Handler to update the profile via PATCH
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }
      const data = await response.json();
      setProfileData(data);
    } catch (err: any) {
      console.error("Update error:", err);
      setError(err.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  // Handler to delete the profile via DELETE
  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your profile? This action cannot be undone."
      )
    ) {
      return;
    }
    setDeleting(true);
    try {
      const response = await fetch("/api/profile", {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete profile");
      }
      // Sign out the user after deletion
      signOut();
    } catch (err: any) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete profile");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--pri-50))] p-4">
        <div className="w-full max-w-md">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--pri-50))] p-4">
        <div className="w-full max-w-md">
          <p className="text-center text-gray-600">
            Please sign in to view your profile
          </p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--pri-50))] p-4">
        <p className="text-center text-gray-600">No profile data available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[hsl(var(--pri-50))] p-4">
      <ProfileForm
        profileData={profileData}
        firstName={firstName}
        lastName={lastName}
        onChangeFirstName={setFirstName}
        onChangeLastName={setLastName}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        updating={updating}
        deleting={deleting}
        error={error}
      />
    </div>
  );
};

export default ProfilePage;
