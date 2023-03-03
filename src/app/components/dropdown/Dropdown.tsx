import { useRef, useEffect, useCallback, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const Dropdown = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(e.target as Node) &&
        open
      ) {
        setOpen(false);
        detailsRef.current.removeAttribute("open");
      }
    },
    [open]
  );

  const handleToggle = (e: React.MouseEvent) => {
    if (!open) {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <details onClick={handleToggle} ref={detailsRef} className="m-details">
      {children}
    </details>
  );
};

export default Dropdown;
