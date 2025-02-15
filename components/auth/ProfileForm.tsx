// components/Profile/ProfileForm.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export interface ProfileData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ProfileFormProps {
  profileData: ProfileData;
  firstName: string;
  lastName: string;
  onChangeFirstName: (value: string) => void;
  onChangeLastName: (value: string) => void;
  onUpdate: (e: React.FormEvent) => void;
  onDelete: () => void;
  updating: boolean;
  deleting: boolean;
  error?: string;
}

export function ProfileForm({
  profileData,
  firstName,
  lastName,
  onChangeFirstName,
  onChangeLastName,
  onUpdate,
  onDelete,
  updating,
  deleting,
  error,
}: ProfileFormProps) {
  return (
    <Card className="w-full max-w-md shadow-lg rounded-2xl bg-white">
      {/* 🌸 Gradient Header for a soft, premium feel */}
      <CardHeader
        className="text-center rounded-t-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #FF9EAA, #FFAFB8)",
          color: "#003F6B",
        }}
      >
        <div className="mx-auto mb-4 p-3 bg-[#0088E8] rounded-full shadow-lg w-fit">
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-semibold tracking-wide">Profile</h1>
      </CardHeader>

      <CardContent className="p-6">
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}

        <form onSubmit={onUpdate} className="space-y-5">
          {/* Email Display */}
          <div>
            <Label htmlFor="email" className="block text-sm text-gray-500">
              Email
            </Label>
            <p className="font-medium text-gray-700">{profileData.email}</p>
          </div>

          {/* First Name */}
          <div>
            <Label htmlFor="firstName" className="block text-sm text-gray-500">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => onChangeFirstName(e.target.value)}
              className="w-full rounded-xl bg-[#FFEFF0] border-[#FD8D9D] focus:ring-pri-600 focus:border-pri-700 px-4 py-2 text-gray-700"
              style={{
                boxShadow: "inset 0px 1px 4px rgba(0,0,0,0.05)",
              }}
            />
          </div>

          {/* Last Name */}
          <div>
            <Label htmlFor="lastName" className="block text-sm text-gray-500">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => onChangeLastName(e.target.value)}
              className="w-full rounded-xl bg-[#FFEFF0] border-[#FD8D9D] focus:ring-pri-600 focus:border-pri-700 px-4 py-2 text-gray-700"
              style={{
                boxShadow: "inset 0px 1px 4px rgba(0,0,0,0.05)",
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            {/* Update Profile Button with Glow Effect */}
            <Button
              type="submit"
              disabled={updating}
              className="flex-1 rounded-xl bg-[#F76983] hover:bg-[#FA7C90] text-white transition-all duration-200 shadow-md hover:shadow-lg"
              style={{
                boxShadow: updating
                  ? "none"
                  : "0px 4px 15px rgba(247, 105, 131, 0.3)",
              }}
            >
              {updating ? "Updating..." : "Update Profile"}
            </Button>

            {/* Delete Profile Button */}
            <Button
              type="button"
              disabled={deleting}
              onClick={onDelete}
              variant="destructive"
              className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              {deleting ? "Deleting..." : "Delete Profile"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
