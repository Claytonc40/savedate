function FooterDashboard() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full bg-white py-5 text-black dark:bg-boxdark dark:text-bodydark2">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center md:flex-row">
          <p className="order-2 mt-5 text-sm text-graydark dark:text-meta-9 md:order-1 md:mt-0">
            Desenvolvido por &copy; Editec Sistemas, {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterDashboard;
