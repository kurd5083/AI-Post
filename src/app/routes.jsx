import { createBrowserRouter } from 'react-router-dom';
import MainLayout from "@/layouts/MainLayout";
import OtherLayout from "@/layouts/OtherLayout";
import Home from '@/pages/Home';
import AnalyticsChannels from '@/pages/AnalyticsChannels';
import Analytics from '@/pages/Analytics';
import Templates from '@/pages/Templates';
import Calendar from '@/pages/Calendar';
import Promotion from '@/pages/Promotion';
import MyOrders from '@/pages/MyOrders';
import Media from '@/pages/Media';
import Help from '@/pages/Help';
import News from '@/pages/News';
import Auth from '@/pages/Auth';
import AcceptInvite from '@/pages/AcceptInvite';
import PostAddEdit from '@/pages/PostAddEdit';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> } 
        ],
    },
    {
        path: '/analytics', 
        element: <OtherLayout />,
        children: [
            { path: ':slug', element: <AnalyticsChannels /> }, 
        ],
    },
    {
        path: '/analytics', 
        element: <OtherLayout />,
        children: [
            { index: true, element: <Analytics /> }, 
        ],
    },
    {
        path: '/templates', 
        element: <OtherLayout />,
        children: [
            { index: true, element: <Templates /> }, 
        ],
    },
    {
        path: '/calendar', 
        element: <OtherLayout />,
        children: [
            { index: true, element: <Calendar /> }, 
        ],
    },
    {
        path: '/promotion', 
        element: <OtherLayout />,
        children: [
            { index: true, element: <Promotion /> }, 
        ],
    },
    {
        path: '/my-orders', 
        element:<OtherLayout />,
        children: [
            { index: true, element: <MyOrders /> }, 
        ],
    },
    {
        path: '/media', 
        element:<OtherLayout />,
        children: [
            { index: true, element: <Media /> }, 
        ],
    },
    {
        path: '/help', 
        element:<OtherLayout />,
        children: [
            { index: true, element: <Help /> }, 
        ],
    },
    {
        path: '/news/', 
        element:<OtherLayout />,
        children: [
            { path: ':id', element: <News /> }, 
        ],
    },
    {
        path: '/auth',
        element: <Auth />,
    },
    {
        path: '/invite-member',
        element: <MainLayout />,
        children: [
            { index: true, element: <AcceptInvite /> }
        ],
    },
    {
        path: '/post-generated',
        element: <PostAddEdit />,
    }
]);