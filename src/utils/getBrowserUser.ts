import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthResponse {
  id?: string;
  fullName?: string;
  email?: string;
  role?: string;
  isLoggedIn: boolean;
}

export const getBrowserUser = (): AuthResponse => {
  const token = Cookies.get("vende_token");

  const defaultResponse: AuthResponse = {
    isLoggedIn: false,
  };

  if (!token) return defaultResponse;

  try {
    const decoded: AuthResponse = jwtDecode(token);
    
    return {
      id: decoded.id,
      fullName: decoded.fullName || "",
      email: decoded.email || "",
      role: decoded.role || "user",
      isLoggedIn: true,
    };
  } catch (error) {
    return defaultResponse;
  }
};