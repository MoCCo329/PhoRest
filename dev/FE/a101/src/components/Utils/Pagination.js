import styled from "styled-components"

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit) || 1
  
  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
           &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i)}
              aria-current={page === i ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages - 1}>
            &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`

const Button = styled.button`
  border: none;
  border-radius: 50px;
  height: 2em;
  width: 2em;
  margin: 0;
  background: none;
  color: black;
  font-size: 1rem;
  font-family: "Pretendard-Regular";

  &:hover {
    background: #fff7e7;
    cursor: pointer;
  }

  &[disabled] {
    background: transparent;
    cursor: revert;
    transform: revert;
    color: #c8c8c8;
  }

  &[aria-current] {
    background: #ffd89e;
    cursor: revert;
    transform: revert;
  }
`


export default Pagination;