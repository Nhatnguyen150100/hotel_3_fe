import { useEffect, useState } from "react";

function ContactItem({
  icon,
  label,
  href,
}: {
  icon: string;
  label: string;
  href: string;
}) {
  return (
    <a
      className="flex flex-col justify-center items-center space-y-1"
      href={href}
      target="_blank"
    >
      <img
        className="rotate-animate "
        src={icon}
        height={16}
        width={16}
        alt={label}
      />
      <span className="text-red-600 text-sm font-medium">{label}</span>
    </a>
  );
}

const DEFINE_DATA = [
  {
    label: "Điện thoại",
    icon: "/contact-us/phone.png",
    href: "tel:0913293802",
  },
  {
    label: "Nhắn tin",
    icon: "/contact-us/sms.png",
    href: "sms:0913293802",
  },
  {
    label: "Chat zalo",
    icon: "/contact-us/zalo.png",
    href: "https://zalo.me/0913293802",
  },
  {
    label: "Facebook",
    icon: "/contact-us/messenger.png",
    href: "https://www.tiktok.com/@ksphuonghoang2samson",
  },
];

export default function ContactUs() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setIsVisible(true);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(false);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed sm:left-0 left-0 sm:bottom-0 bottom-0 flex flex-col justify-center items-center space-y-3 hover:cursor-pointer z-10 invisible opacity-0 ${
        isVisible && "!visible !opacity-100"
      }`}
      style={{
        transition: "opacity 0.5s ease-in-out",
        transform: isVisible ? "translateY(0)" : "translateY(-100vh)",
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        visibility: isVisible ? "visible" : "hidden",
        zIndex: isVisible ? 10 : -1,
      }}
    >
      <div className="min-w-[100vw] sm:min-w-min max-w-[620px] flex flex-row justify-between items-center p-3 bg-white space-x-3">
        {DEFINE_DATA.map((item) => (
          <ContactItem {...item} key={item.label} />
        ))}
      </div>
    </div>
  );
}
