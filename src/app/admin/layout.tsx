const AdminLayout = (props: {
  children: React.ReactNode;
  room: React.ReactNode;
  user: React.ReactNode;
  card: React.ReactNode;
}) => {
  return (
    <main>
      <section>{props.card}</section>
      <section>{props.room}</section>
      <section>{props.user}</section>
      <section>{props.children}</section>
    </main>
  );
};

export default AdminLayout;
