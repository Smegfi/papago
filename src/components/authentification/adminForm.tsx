"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

import { ReactNode } from "react";

export function AdminForm({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

interface FormData {
    password: string;
}

const onSubmit = (data: FormData) => {
    const correctPassword = "Alva1:52c1" 
    if (data.password === correctPassword) {
        console.log("welcome Gandalf White")
        setIsAuthenticated(true)
    } else {
        console.log("Incorrect password.")
    }
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heslo</FormLabel>
              <FormControl>
                <Input type="password" placeholder="zadej heslo:" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">vyhraj nový Iphone</Button>
      </form>
      {isAuthenticated && children}
    </Form>
  )
}