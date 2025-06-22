export default function Footer(){
    return (
        <footer className="text-center text-xs text-gray-400 py-4">
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center space-x-2">
            <img
            src="/tmdbLogoImage.svg"
            alt="TMDB Logo"
            className="w-6 h-6"
            />
            <span>Data provided by The Movie Database (TMDB)</span>
        </a>
        <p>본 사이트는 TMDB API를 사용하고 있으며, TMDB의 공식 승인 또는 인증을 받은 서비스가 아닙니다.</p>
        <p>이 사이트는 비상업적 개인 포트폴리오 용도로 제작되었습니다.</p>
        </footer>
    );
}