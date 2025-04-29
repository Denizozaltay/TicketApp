"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, LogIn } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("asd");

    //şifre 4 haneden kısa olmamali
    if (password.trim().length <= 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setError("");

    // logic buraya yazilacak
    // email ve password değişkenleri var
    // bu degiskenleri auth'a POST istegi ile gonderebiliz, scope içinde
    

  };

  return (
    <>
      <div className="flex flex-col gap-10 bg-white shadow-lg rounded-lg w-fit p-30">
        <div className="flex flex-1 flex-col">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm font-light">Please enter your details</p>
        </div>
        <div className="flex">
            {/* formun login buttonuna herhangi bir action ekleme
            form oldugu icin otomatik olarak submit işlemi yapar
            TODO: handleSubmit metoduna logic eklenmeli
            */}
            
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex-1 w-75">
              <label htmlFor="email">Email Adress</label>
              <Input
                type="email"
                id="email"
                placeholder="Email Adress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/*
            remember me zorunlu değil ancak yapılabilirse güzel eklenti olur buna bakacagiz 
            */}
            <div className="flex flex-row gap-3 items-center">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm">
                Remember for 30 days
              </label>
            </div>
            
            {/* şifreyi burada da ayriyeten dogrulayabiliriz, backendde de 2. defa
            error proof olur 
            */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button className="font-medium cursor-pointer" variant="outline">
              <LogIn /> Login
            </Button>
          </form>

        </div>
        <div className="flex flex-row justify-between text-sm opacity-70">
          <p>Dont have an account?</p>
          {/*
                TODO: bu sign up formuna yönlendiren bir link olacak
                veyahutta form, sign up'a basınca conditional rendering ile register sayfası
                render edilebilir
                */}
          <p className="underline">Sign Up</p>
        </div>
      </div>
    </>
  );
}
