"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type AppUser = {
  id: string;
  email: string;
};

export default function CreditsBalance() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [credits, setCredits] = useState<number | null>(null);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const fetchCredits = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("credits")
      .eq("id", userId)
      .single();

    if (error) {
      setCredits(0);
      return;
    }

    setCredits(data?.credits ?? 0);
  };

  const loadCurrentUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      setUser(null);
      setCredits(null);
      return;
    }

    setUser({
      id: user.id,
      email: user.email || "",
    });

    await fetchCredits(user.id);
  };

  useEffect(() => {
    loadCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
        });
        await fetchCredits(session.user.id);
      } else {
        setUser(null);
        setCredits(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSendOtp = async () => {
    setMessage(null);

    if (!email.trim()) {
      setMessage("Veuillez entrer votre email.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setOtpSent(true);
    setMessage("Code envoyé par email. Saisissez-le ci-dessous.");
  };

  const handleVerifyOtp = async () => {
    setMessage(null);

    if (!email.trim()) {
      setMessage("Veuillez entrer votre email.");
      return;
    }

    if (!otp.trim()) {
      setMessage("Veuillez entrer le code reçu.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otp.trim(),
      type: "email",
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Connexion réussie.");
    setOtp("");
    await loadCurrentUser();
  };

  const handleSignOut = async () => {
    setMessage(null);
    await supabase.auth.signOut();
    setUser(null);
    setCredits(null);
    setOtp("");
    setOtpSent(false);
  };

  const handleRefresh = async () => {
    if (!user) return;
    setRefreshing(true);
    await loadCurrentUser();
    setRefreshing(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-sm mx-auto text-black">
      <h3 className="font-semibold mb-2">Mon compte</h3>

      {user ? (
        <>
          <p className="mb-2 text-sm">
            Connecté : <span className="font-medium">{user.email}</span>
          </p>

          <p className="text-2xl font-bold mb-3">
            {credits ?? 0} crédit{credits === 1 ? "" : "s"}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-3 py-2 bg-gray-200 rounded"
            >
              {refreshing ? "Actualisation..." : "Rafraîchir"}
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="px-3 py-2 bg-red-600 text-white rounded"
            >
              Déconnexion
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />

          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full px-3 py-2 bg-black text-white rounded"
            >
              {loading ? "Envoi..." : "Recevoir un code"}
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Code reçu par email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 mt-3 mb-3 border rounded"
              />

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full px-3 py-2 bg-black text-white rounded"
              >
                {loading ? "Vérification..." : "Valider le code"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                  setMessage(null);
                }}
                className="w-full mt-2 px-3 py-2 bg-gray-200 rounded"
              >
                Changer d’email
              </button>
            </>
          )}

          {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}

          <p className="mt-2 text-xs text-gray-500">
            1 crédit gratuit à la création du compte
          </p>
        </>
      )}
    </div>
  );
}