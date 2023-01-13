export default function Paginator(props) {
    const links = props.links
    return (
        <div class="flex justify-center">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    {links.map((link) => (
                        <li>
                            <a
                                className={"block py-1.5 px-3 transition-all duration-300 rounded " + (link.url ? "hover:bg-gray-300 text-gray-800" : "text-gray-500")}
                                href={link.url}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}