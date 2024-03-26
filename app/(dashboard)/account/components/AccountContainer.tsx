"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Account} from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface AccountContainerProps {
  account: Account;}

function AccountContainer({ account }: AccountContainerProps) {
  const [username, setUsername] = useState(account.username);
  const [isSaving, setIsSaving] = useState(false);


  const updateUsername = async () => {
    setIsSaving(true);
    axios
      .put("/api/account", { username })
      .then((res) => {
        if (!res.data.success) {
          toast.error(
            res.data.message?.message ||
              "Something went wrong saving the username."
          );
          console.error(res.data);
          return;
        }

        const updatedAccount = res.data.data;
        if (updatedAccount) {
          setUsername(updatedAccount.username);
          toast.success("Username updated successfully!");
        }
      })
      .catch((error) => {
        console.error("Something went wrong saving the username.");
        console.error(error);
        toast.error(
          "Something went wrong saving the username. Please try again."
        );
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleStripe = async () => {
    try {
      const response = await axios.get("/api/stripe");

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("Something went wrong with Stripe.");
        toast.error("Something went wrong with Stripe. Please try again.");
      }
    } catch (error) {
      console.error("Something went wrong with Stripe.");
      toast.error("Something went wrong with Stripe. Please try again.");
    }
  };

  return (
    <div className="flex h-full w-full flex-col m-8 gap-y-4">
      <h1 className="text-2xl font-semibold text-gray-700">Account Home</h1>
      <hr />
      <div className="w-fit">
        <label className="mb-2 block text-sm font-bold text-gray-700">
          Username
        </label>
        <Input
          type="text"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username here..."
        />
      </div>
      <div className="flex flex-row gap-x-4">
        <Button
          variant="outline"
          onClick={() => setUsername(account?.username || "")}
        >
          Cancel
        </Button>
        <Button onClick={updateUsername}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
      
    </div>
  );
}

export default AccountContainer;
