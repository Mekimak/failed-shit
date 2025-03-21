import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell, User, LogOut, Settings, Menu, X, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useAuth } from "@/contexts/AuthContext";

interface RenterHeaderProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

const RenterHeader = ({
  onMenuToggle,
  isSidebarOpen = true,
}: RenterHeaderProps) => {
  const [notifications, setNotifications] = useState(2);
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-black/60 backdrop-blur-sm border-b border-emerald-100 dark:border-emerald-800/30 shadow-sm">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="mr-2 lg:hidden rounded-full"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
            ) : (
              <Menu className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
            )}
          </Button>

          <Link to="/" className="flex items-center gap-2 mr-6">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center text-white font-playfair text-xl">
              E
            </div>
            <span className="font-playfair text-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent hidden md:inline">
              Efoy
            </span>
          </Link>
        </div>

        <div className="hidden md:flex relative mx-4 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
          <Input
            placeholder="Search for properties..."
            className="pl-10 bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                <Bell className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                    {notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4">
                <h3 className="font-medium text-emerald-900 dark:text-emerald-50 mb-2">
                  Notifications
                </h3>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                    <p className="text-sm text-emerald-900 dark:text-emerald-50">
                      Your application for Modern Apartment has been approved
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      2 hours ago
                    </p>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                    <p className="text-sm text-emerald-900 dark:text-emerald-50">
                      New message from Sarah Johnson about your inquiry
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      Yesterday
                    </p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      profile?.avatar_url ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.first_name || "User"}`
                    }
                    alt={profile?.first_name || "User"}
                  />
                  <AvatarFallback className="bg-emerald-200 text-emerald-800">
                    {profile?.first_name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center gap-2 p-2">
                <div className="flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        profile?.avatar_url ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.first_name || "User"}`
                      }
                      alt={profile?.first_name || "User"}
                    />
                    <AvatarFallback className="bg-emerald-200 text-emerald-800">
                      {profile?.first_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-900 dark:text-emerald-50">
                    {profile?.first_name} {profile?.last_name}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    {profile?.email}
                  </p>
                </div>
              </div>
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default RenterHeader;
