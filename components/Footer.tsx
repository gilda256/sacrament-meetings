export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 p-4 mt-8">
      <div className="max-w-6xl mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Provo 5th Ward. All rights reserved.</p>
      </div>
    </footer>
  );
}