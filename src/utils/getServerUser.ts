import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface AuthResponse {
  fullName?: string;
  email?: string;
  role?: string;
  isLoggedIn: boolean;
}

export const getServerUser = async (): Promise<AuthResponse> => {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("vende_token")?.value;
  console.log("Token Found:", token);

  const defaultResponse: AuthResponse = {
    isLoggedIn: false,
  };

  if (!token) return defaultResponse;

  try {
    const decoded: AuthResponse = jwtDecode(token);
    return {
      fullName: decoded.fullName || "",
      email: decoded.email || "",
      role: decoded.role || "user",
      isLoggedIn: true,
    };
  } catch (error) {
    return defaultResponse;
  }
};