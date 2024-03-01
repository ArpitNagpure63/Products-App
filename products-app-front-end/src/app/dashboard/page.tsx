'use client';
import axiosInstance from "@/utility/axios";
import { useEffect, useState } from "react";
import DashboardErrorState from "./Index";
import { deleteAllCookies } from "@/utility/cookie";
import { useRouter } from "next/navigation";
import Loader from "../loader/page";
import './products.css';
import Image from "next/image";

interface ProductsResponse {
    id: number;
    title: string;
    thumbnail: string;
    price: number;
    description: string;
    brand: string;
    rating: number;
    discountPercentage: number;
}

interface DashboardResponse {
    products: ProductsResponse[];
    name: string;
}

const Dashboard = () => {
    const [isDashboardAccesible, setDashboardAccesible] = useState<boolean>(false);
    const [isLoader, setIsLoader] = useState<boolean>(true);
    const [products, setProducts] = useState<ProductsResponse[]>([]);
    const [userName, setUserName] = useState<string>('');
    const router = useRouter();

    const fetchDashboardContent = async () => {
        try {
            const response = await axiosInstance.get('/dashboard', { withCredentials: true });
            const data: DashboardResponse = response.data;
            setDashboardAccesible(true);
            setProducts(data.products);
            setUserName(data.name)
        } catch (error) {
            setDashboardAccesible(false);
        }
        setIsLoader(false);
    };

    const handleLogoutClick = () => {
        deleteAllCookies();
        router.push('/login');
    };

    useEffect(() => {
        fetchDashboardContent();
    }, []);

    return <>
        {isDashboardAccesible
            ? <div className="dashboard-container">
                <div className="dashboard-header">
                    <div className="dashboard-title">Welcome to {userName} to our products app</div>
                    <button className="dashboard-logout" onClick={handleLogoutClick}>Log Out</button>
                </div>
                <div className="dashboard-body">
                    {
                        products.map((item, index) => {
                            return (
                                <div className="products-card-wrapper" key={index}>
                                    <div className="product-img">
                                        <Image
                                            src={item.thumbnail}
                                            alt="Products"
                                            width={0}
                                            height={0}
                                            sizes="100vh"
                                            className="product-img-item"
                                        />
                                    </div>
                                    <div className="product-info">
                                        <div className="product-text-wrapper">
                                            <h1 className="product-text-h1">{item.title}</h1>
                                            <div className="products-text-brand">{item.brand}</div>
                                            <div className="products-text-desc">{item.description}</div>
                                            <div className="products-text-rating">{item.rating.toFixed(1)} / 5</div>
                                            <div className="product-text-price">
                                                <div className="product-text-price-current">{(item.price - (item.price * (item.discountPercentage / 100))).toFixed(2)} $</div>
                                                <div className="product-text-price-original">{item.price} $</div>
                                                <div className="product-text-price-discount">{item.discountPercentage}% off</div>
                                            </div>
                                        </div>
                                        <div className="product-price-btn-wrapper">
                                            <button className="product-price-btn">Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            : isLoader
                ? <Loader />
                : <DashboardErrorState />
        }
    </>
};

export default Dashboard;