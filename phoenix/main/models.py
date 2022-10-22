from django.db import models


class Restaurant(models.Model):
    name = models.TextField(verbose_name='Название')
    address = models.TextField(verbose_name='Адрес')
    description = models.TextField(verbose_name='описание', default='lol')
    image = models.ImageField(verbose_name='Изображение', upload_to=f'restaurant/%Y/%m/%d/', default=None, blank=True, null=True)
    


    class Meta:
        verbose_name = 'Ресторан'
        verbose_name_plural = 'Рестораны'
    
    def __str__(self):
        return f"{self.name} {self.address}"
    

class Product(models.Model):
    name = models.TextField(verbose_name='Наименование')
    price = models.FloatField(verbose_name='Цена')
    description = models.TextField(verbose_name='Описание')

    rest_id = models.ForeignKey(Restaurant, verbose_name='Ресторан',
                                on_delete=models.CASCADE)
    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'
    
    def __str__(self):
        return f"{self.id} {self.name} {self.price}"


class Table(models.Model):
    number = models.IntegerField(verbose_name='Номер стола')
    rest_id = models.ForeignKey(Restaurant, verbose_name='Ресторан',
                                on_delete=models.CASCADE)
    class Meta:
        verbose_name = 'Стол'
        verbose_name_plural = 'Столы'
    
    def __str__(self):
        return f"{self.number}"


class OrderStatus(models.TextChoices):
    done = 'd', 'Завершённый'
    in_progress = 'p', 'В работе'
    canceled = 'c', 'Отменённый'


class Order(models.Model):
    status = models.CharField(max_length=15, choices=OrderStatus.choices,
                              verbose_name='Статус')
    start_date = models.DateTimeField(verbose_name='Дата начала')
    end_date = models.DateTimeField(verbose_name='Дата окончания')

    table_id = models.ForeignKey(Table, verbose_name='Стол',
                                 on_delete=models.CASCADE)
    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'

    def __str__(self):
        return f"{self.id}  {self.status} {self.start_date}"


class OrderBasket(models.Model):
    order_id = models.ForeignKey(Order, verbose_name='Заказ',
                                 on_delete=models.CASCADE)

    product_id = models.ForeignKey(Product, verbose_name='Продукт',
                                   on_delete=models.CASCADE)

    number = models.IntegerField(verbose_name='Количество')
    
    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'
    
    def __str__(self):
        return f"{self.id}"
    
        
class Officiant(models.Model):
    name = models.TextField(verbose_name='ФИО')
    rest_id = models.ForeignKey(Restaurant, verbose_name='Ресторан', on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Официант'
        verbose_name_plural = 'Официанты'
    
    def __str__(self):
        return f"{self.name}"