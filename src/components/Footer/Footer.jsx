const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-300/30 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          <a
            href="https://mdranju.xyz"
            target="_blank"
            className="text-blue-500 hover:underline ml-1 font-bold"
          >
            Md. Ranju
          </a>{" "}
          &
          <a
            href="https://github.com/MukitHossen7"
            target="_blank"
            className="text-blue-500 hover:underline ml-1 font-bold"
          >
            Mukit Hossen
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
