import { createContext, useContext, useState, ReactNode } from "react";

interface AccountContextValue {
  accountId: string | null;
  setAccountId: (id: string | null) => void;
}

const AccountContext = createContext<AccountContextValue | undefined>(
  undefined
);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [accountIdState, setAccountIdState] = useState<string | null>(() => {
    const stored = localStorage.getItem("accountId");
    return stored ?? null;
  });

  const setAccountId = (id: string | null) => {
    setAccountIdState(id);
    if (id) {
      localStorage.setItem("accountId", id);
    } else {
      localStorage.removeItem("accountId");
    }
  };

  return (
    <AccountContext.Provider
      value={{ accountId: accountIdState, setAccountId }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}
