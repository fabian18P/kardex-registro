import Link from "next/link";

interface SidebarLinkProps {
  href: string;
  icon: string;
  text: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, text }) => {
  return (
    <Link href={href}>
      <div className="flex items-center gap-3 py-3.5 px-3 md:px-9 cursor-pointer hover:bg-[#4C2500] transition-colors duration-200">
        <img className="w-10 min-w-5" src={icon} alt={text}/>
        <p className="hidden md:block">{text}</p>
      </div>
    </Link>
  );
};

export default SidebarLink;