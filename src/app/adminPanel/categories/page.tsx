import Aside from '@/components/modules/AdminPanel/Aside/Aside';
import Header from '@/components/modules/AdminPanel/Header/Header';
import MenuList from '@/components/templates/AdminPanel/menus/MenuList';

const Categories = () => {
    return (
        <div className='grid grid-cols-[0%_100%] lg:grid-cols-[20%_80%] xl:grid-cols-[20%_80%] 2xl:grid-cols-[15%_85%] grid-rows-[100px_1fr] h-screen w-full grid-template'>
            <Header />
            <Aside />
            <div className="main">
                <MenuList />
            </div>
        </div>
    )
}

export default Categories;