import Link from 'next/link';

const Header: React.FC = () => {
   return (
      <header>
         <Link href="/">
            
               <svg
                  className='w-8 h8 fill-current'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
               >
                  <path d='/ottertype/public/otter.svg'></path>
               </svg>
               <span className='text-lg font-semibold text-maintext'>ottertype</span>
            
         </Link>
      </header>
   )
};

export default Header;