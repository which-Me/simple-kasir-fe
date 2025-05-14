import { Input, Kbd } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "../icons/search-icon";

export const InputSearch = () => {
  const [os, setOs] = useState(null);
  //ref
  const SearchRef = useRef(null);

  const DetectOS = () => {
    const userAgent = navigator.userAgent;

    switch (true) {
      case userAgent.indexOf("Windows NT") !== -1:
        return "ctrl"; // Untuk Windows
      case userAgent.indexOf("Mac OS X") !== -1:
        return "command"; // Untuk macOS
      case userAgent.indexOf("Android") !== -1:
        return null; // Untuk Android
      case userAgent.indexOf("Linux") !== -1:
        return "ctrl"; // Untuk Linux
      default:
        return null; // Jika tidak ada yang cocok
    }
  };

  useEffect(() => {
    const detectOs = DetectOS();
    setOs(detectOs);

    const handleKeyDown = (e) => {
      // Cek apakah tombol Command (di macOS) atau Ctrl (di Windows) ditekan
      // dan tombol K juga ditekan
      if (detectOs === "command" && e.metaKey && e.key === "k") {
        SearchRef.current.focus();
      } else if (detectOs === "ctrl" && e.ctrlKey && e.key === "k") {
        SearchRef.current.focus();
      }
    };

    // Tambahkan event listener saat komponen dipasang
    window.addEventListener("keydown", handleKeyDown);

    // Hapus event listener saat komponen dibersihkan
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Input
      onValueChange={(e) => console.log(e)}
      ref={SearchRef}
      startContent={<SearchIcon />}
      endContent={os && <Kbd keys={os}>K</Kbd>}
      // isClearable
      className="w-full focus:outline-none"
      classNames={{
        input: "w-full focus:outline-none",
        mainWrapper: "w-full focus:outline-none",
      }}
      placeholder="Search..."
    />
  );
};
