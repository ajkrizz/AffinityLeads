
import DashboardNavbar from "@/components/ui/DashboardNavbar";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function DashboardLayout({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col h-full w-full">
            <DashboardNavbar />
            {children}
            <ToastContainer />
        </div>
    );
}
