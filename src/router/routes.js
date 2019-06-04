import Bills from '@/views/Bills'
import CarTrackers from '@/views/CarTrackers'
import Vehicles from '@/views/Vehicles'
import OwnerCredentials from '@/views/OwnerCredentials'
import Login from '@/views/auth/Login'
import Logout from '@/views/auth/Logout'
import Taxes from '@/views/Taxes'

export default [
    {
        path: '/',
        redirect: {
            name: 'bills'
        }
    },
    {
        path: '/bills',
        name: 'bills',
        component: Bills
    },
    {
        path: '/car-trackers',
        name: 'cartrackers',
        component: CarTrackers
    },
    {
        path: '/vehicles',
        name: 'vehicles',
        component: Vehicles
    },
    {
        path: '/owner-credentials',
        name: 'ownercredentials',
        component: OwnerCredentials
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    },
    {
        path: '/taxes',
        name: 'taxes',
        component: Taxes
    },
    {
        path: '*',
        redirect: {
            name: 'bills'
        }
    }
]