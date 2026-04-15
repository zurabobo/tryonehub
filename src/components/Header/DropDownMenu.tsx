interface DropdownMenuProps {
    open: boolean;
    children: React.ReactNode;
  }
  
  export const DropdownMenu: React.FC<DropdownMenuProps> = ({ open, children }) => {
    return (
      <div
        className={`
         fixed isolate top-[72px] left-1/2 -translate-x-1/2
        w-full max-w-[1728px] bg-[#1E293B] overflow-y-auto z-[9999]
        grid 
        transition-[max-height,opacity] duration-300 ease-in-out
          ${open ? 'max-h-[90vh] opacity-100 visible' : 'max-h-0 opacity-0 invisible'}
          grid-cols-4
          lg:grid-cols-4
          sm:grid-cols-3
        `}
      >
        {children}
      </div>
    );
  };
  