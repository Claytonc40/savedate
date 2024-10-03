import { IconType } from 'react-icons';

/**
 * Represents the data structure for an icon.
 * @author Clayton de Aguiar Cavalcante
 * @company Editec Sistemas
 */
export interface IconData {
  name: string;
  icon: IconType;
}

/**
 * Array of icon data.
 */
export const icons: IconData[] = [
  //fa
  { name: 'FaCoffee', icon: require('react-icons/fa').FaCoffee },
  { name: 'FaCarrot', icon: require('react-icons/fa').FaCarrot },
  { name: 'FaFish', icon: require('react-icons/fa').FaFish },
  { name: 'FaHamburger', icon: require('react-icons/fa').FaHamburger },
  { name: 'FaBacon', icon: require('react-icons/fa').FaBacon },
  //fa6
  { name: 'FaBottleWater', icon: require('react-icons/fa6').FaBottleWater },
  { name: 'FaCashRegister ', icon: require('react-icons/fa6').FaCashRegister },
  //ri
  { name: 'RiDrinks2Fill', icon: require('react-icons/ri').RiDrinks2Fill },
  //Lu
  { name: 'LuGlassWater', icon: require('react-icons/lu').LuGlassWater },
  { name: 'LuBanana ', icon: require('react-icons/lu').LuBanana },
  //ci
  { name: 'CiCoffeeBean', icon: require('react-icons/ci').CiCoffeeBean },
  { name: 'CiCoffeeCup', icon: require('react-icons/ci').CiCoffeeCup },
  { name: 'CiFries', icon: require('react-icons/ci').CiFries },
  { name: 'CiApple', icon: require('react-icons/ci').CiApple },
  //gi
  { name: 'GiIceCreamCone', icon: require('react-icons/gi').GiIceCreamCone },
  { name: 'GiCakeSlice', icon: require('react-icons/gi').GiCakeSlice },
  { name: 'GiCupcake', icon: require('react-icons/gi').GiCupcake },
  { name: 'GiChickenOven', icon: require('react-icons/gi').GiChickenOven },
  { name: 'GiPizzaSlice', icon: require('react-icons/gi').GiPizzaSlice },
  { name: 'GiSteak', icon: require('react-icons/gi').GiSteak },
  { name: 'GiCash', icon: require('react-icons/gi').GiCash },
  { name: 'GiCoffeeCup', icon: require('react-icons/gi').GiCoffeeCup },
  { name: 'GiCroissant', icon: require('react-icons/gi').GiCroissant },
  //io
  { name: 'IoIosIceCream', icon: require('react-icons/io').IoIosIceCream },
  //md
  { name: 'MdOutlineToys', icon: require('react-icons/md').MdOutlineToys },
  { name: 'MdFastfood', icon: require('react-icons/md').MdFastfood },
  { name: 'MdRestaurant', icon: require('react-icons/md').MdRestaurant },
  { name: 'MdLocalPizza', icon: require('react-icons/md').MdLocalPizza },
  { name: 'MdLocalDrink', icon: require('react-icons/md').MdLocalDrink },
  { name: 'MdLocalCafe', icon: require('react-icons/md').MdLocalCafe },
  { name: 'MdLocalBar', icon: require('react-icons/md').MdLocalBar },
  { name: 'MdLocalDining', icon: require('react-icons/md').MdLocalDining },
  {
    name: 'MdLocalGroceryStore',
    icon: require('react-icons/md').MdLocalGroceryStore,
  },
  { name: 'MdLocalMall', icon: require('react-icons/md').MdLocalMall },
  { name: 'MdLocalOffer', icon: require('react-icons/md').MdLocalOffer },
  { name: 'MdLocalShipping', icon: require('react-icons/md').MdLocalShipping },
  { name: 'MdLocalAtm', icon: require('react-icons/md').MdLocalAtm },
  { name: 'MdLocalHospital', icon: require('react-icons/md').MdLocalHospital },
  { name: 'MdLocalPharmacy', icon: require('react-icons/md').MdLocalPharmacy },
  { name: 'MdLocalPolice', icon: require('react-icons/md').MdLocalPolice },
  { name: 'MdLocalTaxi', icon: require('react-icons/md').MdLocalTaxi },
  {
    name: 'MdLocalGasStation',
    icon: require('react-icons/md').MdLocalGasStation,
  },
  { name: 'MdLocalCarWash', icon: require('react-icons/md').MdLocalCarWash },
  { name: 'MdLocalParking', icon: require('react-icons/md').MdLocalParking },
  {
    name: 'MdLocalPrintshop',
    icon: require('react-icons/md').MdLocalPrintshop,
  },
  {
    name: 'MdLocalLaundryService',
    icon: require('react-icons/md').MdLocalLaundryService,
  },
  { name: 'MdLocalFlorist', icon: require('react-icons/md').MdLocalFlorist },
  { name: 'MdLocalLibrary', icon: require('react-icons/md').MdLocalLibrary },
  { name: 'MdLocalMovies', icon: require('react-icons/md').MdLocalMovies },
  //tb
  { name: 'TbHorseToy', icon: require('react-icons/tb').TbHorseToy },

  //vsc
  { name: 'VscOutput', icon: require('react-icons/vsc').VscOutput },
  { name: 'VscSymbolMethod', icon: require('react-icons/vsc').VscSymbolMethod },
  //si
  { name: 'SiCashapp', icon: require('react-icons/si').SiCashapp },
  { name: 'SiCashapp', icon: require('react-icons/si').SiCashapp },
  //bs
  { name: 'BsCupStraw', icon: require('react-icons/bs').BsCupStraw },
];
