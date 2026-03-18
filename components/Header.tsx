import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <Image
          src="/logo.png" // ou /logo.svg
          alt="LR HomeStaging"
          width={150}
          height={50}
        />
        <span className="ml-4 font-bold text-xl text-gray-900">LR HomeStaging</span>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#form" className="text-gray-900 hover:text-yellow-500">Diagnostic</a></li>
          <li><a href="#offres" className="text-gray-900 hover:text-yellow-500">Offres</a></li>
          <li><a href="#contact" className="text-gray-900 hover:text-yellow-500">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
            
