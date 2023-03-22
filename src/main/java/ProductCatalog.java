public class ProductCatalog {

    private static ProductCatalog catalog;

    private ProductCatalog(){}

    public static ProductCatalog getInstance(){
        if(catalog == null){
            return new ProductCatalog();
        }
        return catalog;
    }

    void testMeth(){
        System.out.println("I am a test method in the product catalog");
    }

}
