import Link from "next/link";

const DashboardErrorState =()=> {
    return <div className="dashboard-error-wrapper">
        <div className="dashboard-error-text">You are not eligible to access this page, Your session might be expired</div>
        <Link href="/login" className="dashboard-error-button">Go To Login Page</Link>
    </div>
};

export default DashboardErrorState;