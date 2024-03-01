import Link from "next/link";

export default function Home() {
  return (
    <div className="app-container">
      <div className="app-text-wrapper">
        <div className="app-title">Welcome to prodcuts app</div>
        <div className="app-subtitle">To view products on our app, please login or signup on below links</div>
      </div>
      <div className="button-container">
        <Link href="login" className="cta-button">Login</Link>
        <Link href="signup" className="cta-button">Signup</Link>
      </div>
    </div>
  );
};