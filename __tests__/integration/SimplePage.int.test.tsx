import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import SimplePage from "../..//src/features/demo/SimplePage";

describe("SimplePage (integracion simple por props)", () => {
  it("actualiza el valor al hacer clicl en + y -", async () => {
    
    const user = userEvent.setup();
    
    // Renderizamos la página completa
    render(<SimplePage />);

    // Obtenemos el span que muestra el valor actual (aria-label="count")
    const value = screen.getByLabelText("count");

    //verificamos valor inicial
    expect(value).toHaveTextContent("0");

    // Simulamos clic en el botón "+"
    await user.click(screen.getByRole("button", { name: "+" }));

    // Validamos incremento
    expect(value).toHaveTextContent("1");

    //simulamos click en el boton "-"
    await user.click(screen.getByRole("button", { name: "-" }));

    //validamos que vuelva a 0
    expect(value).toHaveTextContent("0");
  });
});
