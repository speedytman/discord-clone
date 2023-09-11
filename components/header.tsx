const Header = () => {
  return (
    <div>
      <UserMenu
        image={session.user.image!}
        name={session.user.name!}
        email={session.user.email!}
      />
    </div>
  );
};

export default Header;
