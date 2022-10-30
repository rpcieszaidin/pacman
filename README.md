Miguel García del Real Ortiz

# He refactorizado el código de manera masiva en la última versión
    · He eliminado la clase mapa ya que no era necesaria
    · El movimiento ya no altera el mapa
    · Cuando una entidad se mueve crea una copia profunda del mapa
    introduce las entidades en esta copia y lo imprime de nuevo completo
    · Hasta donde se es completamente funcional y no debería de haber ningún problema
    y no debería de dar ningún problema al implementar más mapas y funcionalidad